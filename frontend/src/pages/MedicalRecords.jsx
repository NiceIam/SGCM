import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'react-toastify';

const MedicalRecords = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    loadMedicalRecords();
  }, []);

  const loadMedicalRecords = async () => {
    try {
      const response = await axios.get('/api/medical-records');
      setRecords(response.data.medicalRecords);
    } catch (error) {
      toast.error('Error al cargar historiales clínicos');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    try {
      const patientId = user.role === 'paciente' ? user.id : selectedRecord?.patientId;
      const response = await axios.get(`/api/reports/medical-records/${patientId}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `historial_clinico_${patientId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success('Reporte descargado exitosamente');
    } catch (error) {
      toast.error('Error al descargar reporte');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Historial Clínico</h1>
        {records.length > 0 && (
          <button onClick={handleDownloadReport} className="btn btn-primary">
            Descargar PDF
          </button>
        )}
      </div>

      {records.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500">No hay registros médicos</p>
        </div>
      ) : (
        <div className="space-y-4">
          {records.map((record) => (
            <div key={record.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="text-sm text-gray-500">
                      {format(new Date(record.recordDate), 'PPP', { locale: es })}
                    </span>
                    <span className="badge badge-info">
                      Dr. {record.doctor.user.firstName} {record.doctor.user.lastName}
                    </span>
                    {record.doctor.specialty && (
                      <span className="text-sm text-gray-600">
                        {record.doctor.specialty.name}
                      </span>
                    )}
                  </div>

                  {user?.role !== 'paciente' && (
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Paciente:</strong> {record.patient.firstName} {record.patient.lastName}
                    </p>
                  )}

                  {record.diagnosis && (
                    <div className="mb-3">
                      <p className="text-sm font-semibold text-gray-700">Diagnóstico:</p>
                      <p className="text-sm text-gray-600">{record.diagnosis}</p>
                    </div>
                  )}

                  {record.treatment && (
                    <div className="mb-3">
                      <p className="text-sm font-semibold text-gray-700">Tratamiento:</p>
                      <p className="text-sm text-gray-600">{record.treatment}</p>
                    </div>
                  )}

                  {record.prescriptions && (
                    <div className="mb-3">
                      <p className="text-sm font-semibold text-gray-700">Prescripciones:</p>
                      <p className="text-sm text-gray-600">{record.prescriptions}</p>
                    </div>
                  )}

                  {record.observations && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Observaciones:</p>
                      <p className="text-sm text-gray-600">{record.observations}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalRecords;
