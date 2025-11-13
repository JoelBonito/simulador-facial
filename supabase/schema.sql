-- =====================================================
-- SIMULADOR FACIAL - DATABASE SCHEMA
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- PATIENTS TABLE
-- =====================================================
CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    cpf VARCHAR(14),
    birth_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster searches
CREATE INDEX idx_patients_name ON patients(name);
CREATE INDEX idx_patients_email ON patients(email);
CREATE INDEX idx_patients_cpf ON patients(cpf);

-- =====================================================
-- SIMULATIONS TABLE
-- =====================================================
CREATE TABLE simulations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    procedure_type VARCHAR(50) NOT NULL,
    technical_form JSONB NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'processing',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by VARCHAR(255),

    CONSTRAINT valid_procedure_type CHECK (
        procedure_type IN (
            'facetas-dentarias',
            'clareamento-dentario',
            'implantes-dentarios',
            'botox',
            'harmonizacao-facial',
            'rinomodelacao',
            'implantes-capilares'
        )
    ),
    CONSTRAINT valid_status CHECK (
        status IN ('processing', 'completed', 'failed')
    )
);

-- Indexes
CREATE INDEX idx_simulations_patient ON simulations(patient_id);
CREATE INDEX idx_simulations_procedure ON simulations(procedure_type);
CREATE INDEX idx_simulations_status ON simulations(status);
CREATE INDEX idx_simulations_created_at ON simulations(created_at DESC);

-- =====================================================
-- SIMULATION IMAGES TABLE
-- =====================================================
CREATE TABLE simulation_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    simulation_id UUID NOT NULL REFERENCES simulations(id) ON DELETE CASCADE,
    image_type VARCHAR(20) NOT NULL,
    label VARCHAR(100) NOT NULL,
    storage_path VARCHAR(500) NOT NULL,
    public_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT valid_image_type CHECK (
        image_type IN ('before', 'after', 'reference')
    )
);

-- Index
CREATE INDEX idx_simulation_images_simulation ON simulation_images(simulation_id);

-- =====================================================
-- BUDGETS TABLE
-- =====================================================
CREATE TABLE budgets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    simulation_id UUID NOT NULL REFERENCES simulations(id) ON DELETE CASCADE,
    items JSONB NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'BRL',
    valid_until DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX idx_budgets_simulation ON budgets(simulation_id);

-- =====================================================
-- TECHNICAL REPORTS TABLE
-- =====================================================
CREATE TABLE technical_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    simulation_id UUID NOT NULL REFERENCES simulations(id) ON DELETE CASCADE,
    diagnosis TEXT NOT NULL,
    recommendations JSONB NOT NULL,
    contraindications JSONB,
    expected_results TEXT NOT NULL,
    recovery_time VARCHAR(100) NOT NULL,
    care_instructions JSONB NOT NULL,
    follow_up_schedule VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX idx_technical_reports_simulation ON technical_reports(simulation_id);

-- =====================================================
-- VIEWS
-- =====================================================

-- Complete simulation view with all related data
CREATE VIEW simulations_complete AS
SELECT
    s.id,
    s.patient_id,
    s.procedure_type,
    s.technical_form,
    s.status,
    s.created_at,
    s.updated_at,
    s.created_by,
    p.name as patient_name,
    p.email as patient_email,
    p.phone as patient_phone,
    COALESCE(
        json_agg(
            json_build_object(
                'id', si.id,
                'type', si.image_type,
                'label', si.label,
                'url', si.public_url
            )
        ) FILTER (WHERE si.id IS NOT NULL),
        '[]'
    ) as images,
    b.id as budget_id,
    b.total as budget_total,
    tr.id as report_id
FROM simulations s
JOIN patients p ON s.patient_id = p.id
LEFT JOIN simulation_images si ON s.id = si.simulation_id
LEFT JOIN budgets b ON s.id = b.simulation_id
LEFT JOIN technical_reports tr ON s.id = tr.simulation_id
GROUP BY s.id, p.id, b.id, tr.id;

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_patients_updated_at
    BEFORE UPDATE ON patients
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_simulations_updated_at
    BEFORE UPDATE ON simulations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_budgets_updated_at
    BEFORE UPDATE ON budgets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_technical_reports_updated_at
    BEFORE UPDATE ON technical_reports
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================
-- To be configured based on authentication requirements

-- Enable RLS on tables
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulation_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE technical_reports ENABLE ROW LEVEL SECURITY;

-- Example policies (adjust based on your auth setup)
-- For now, allow all operations for authenticated users

CREATE POLICY "Allow all for authenticated users" ON patients
    FOR ALL USING (true);

CREATE POLICY "Allow all for authenticated users" ON simulations
    FOR ALL USING (true);

CREATE POLICY "Allow all for authenticated users" ON simulation_images
    FOR ALL USING (true);

CREATE POLICY "Allow all for authenticated users" ON budgets
    FOR ALL USING (true);

CREATE POLICY "Allow all for authenticated users" ON technical_reports
    FOR ALL USING (true);

-- =====================================================
-- STORAGE BUCKETS (Execute in Supabase Storage UI)
-- =====================================================
-- Create bucket: 'simulation-images'
-- Policy: Allow authenticated users to upload and read

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Insert sample patient
INSERT INTO patients (name, email, phone, cpf) VALUES
('João da Silva', 'joao@example.com', '(11) 99999-9999', '123.456.789-00');

-- Insert sample simulation
INSERT INTO simulations (patient_id, procedure_type, technical_form, status) VALUES
(
    (SELECT id FROM patients WHERE email = 'joao@example.com'),
    'facetas-dentarias',
    '{"toothColor": "A1", "teethQuantity": 8, "materialType": "porcelana", "notes": "Paciente busca sorriso mais branco"}',
    'completed'
);
