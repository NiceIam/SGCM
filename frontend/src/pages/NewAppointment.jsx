import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const NewAppointment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  useEffect(() => {
    loadDoctorsAndSpecialties();
  }, []);

  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      loadAvailableSlots();
    }
  }, [selectedDoctor, selectedDate]);

  const loadDoctorsAndSpecialties = async () => {
    try {
      const [doctorsRes, specialtiesRes] = await Promise.all([
        axios.get('/api/doctors'),
        axios.get('/api/doctors')
      ]);
      
      setDoctors(doctorsRes.data.doctors);
      
      // Extraer especialidades únicas
      const uniqueSpecialties = [...new Map(
        doctorsRes.data.doctors
          .filter(d => d.specialty)
          .map(d => [d.specialty.id, d.specialty])
      ).values()];
      
      setSpecialties(uniqueSpecialties);
    } catch (error) {
      toast.error('Error al cargar información');
    }
  };

  const loadAvailableSlots = async () => {
    setLoadingSlots(true);
    setAvailableSlots([]);
    setSelectedTime('');
    
    try {
      const response = await axios.get(
        `/api/doctors/${selectedDoctor.id}/availability?date=${selectedDate}`
      );
      
      if (response.data.availableSlots && response.data.availableSlots.length > 0) {
        setAvailableSlots(response.data.availableSlots);
      } else {
        const dayName = daysOfWeek[response.data.dayOfWeek];
        toast.info(`El médico no tiene disponibilidad los días ${dayName}. Por favor selecciona otra fecha.`);
      }
    } catch (error) {
      toast.error('Error al cargar horarios disponibles');
    } finally {
      setLoadingSlots(false);
    }
  };

  const filteredDoctors = selectedSpecialty
    ? doctors.filter(d => d.specialty?.id === parseInt(selectedSpecialty))
    : doctors;

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDate('');
    setSelectedTime('');
    setAvailableSlots([]);
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    setLoading(true);

    try {
      await axios.post('/api/appointments', {
        doctorId: selectedDoctor.id,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        reason
      });
      
      toast.success('¡Cita agendada exitosamente!');
      navigate('/appointments');
    } catch (error) {
      const message = error.response?.data?.message || 'Error al agendar cita';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Fecha mínima: mañana
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Fecha máxima: 3 meses adelante
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Agendar Nueva Cita</h1>
        <button
          onClick={() => navigate('/appointments')}
          className="text-gray-600 hover:text-gray-800"
        >
          ← Volver
        </button>
      </div>

      {/* Progress Steps */}
      <div className="card">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <span className={step >= 1 ? 'font-semibold' : 'text-gray-500'}>
              Seleccionar Médico
            </span>
          </div>
          <div className="flex-1 h-1 mx-4 bg-gray-200">
            <div className={`h-full ${step >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`} 
                 style={{ width: step >= 2 ? '100%' : '0%', transition: 'width 0.3s' }} />
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
            <span className={step >= 2 ? 'font-semibold' : 'text-gray-500'}>
              Fecha y Hora
            </span>
          </div>
          <div className="flex-1 h-1 mx-4 bg-gray-200">
            <div className={`h-full ${step >= 3 ? 'bg-primary-600' : 'bg-gray-200'}`}
                 style={{ width: step >= 3 ? '100%' : '0%', transition: 'width 0.3s' }} />
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              3
            </div>
            <span className={step >= 3 ? 'font-semibold' : 'text-gray-500'}>
              Confirmar
            </span>
          </div>
        </div>

        {/* Step 1: Select Doctor */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtrar por Especialidad (Opcional)
              </label>
              <select
                className="input"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                <option value="">Todas las especialidades</option>
                {specialties.map((specialty) => (
                  <option key={specialty.id} value={specialty.id}>
                    {specialty.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Médicos Disponibles ({filteredDoctors.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    onClick={() => handleDoctorSelect(doctor)}
                    className="border-2 border-gray-200 rounded-lg p-4 hover:border-primary-500 hover:shadow-md cursor-pointer transition-all"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl font-bold text-primary-600">
                          {doctor.user.firstName[0]}{doctor.user.lastName[0]}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">
                          Dr. {doctor.user.firstName} {doctor.user.lastName}
                        </h4>
                        {doctor.specialty && (
                          <p className="text-sm text-primary-600 font-medium">
                            {doctor.specialty.name}
                          </p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">
                          Duración: {doctor.consultationDuration} min
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Select Date and Time */}
        {step === 2 && selectedDoctor && (
          <div className="space-y-6">
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-600">
                    {selectedDoctor.user.firstName[0]}{selectedDoctor.user.lastName[0]}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">
                    Dr. {selectedDoctor.user.firstName} {selectedDoctor.user.lastName}
                  </p>
                  {selectedDoctor.specialty && (
                    <p className="text-sm text-gray-600">{selectedDoctor.specialty.name}</p>
                  )}
                </div>
                <button
                  onClick={() => {
                    setStep(1);
                    setSelectedDoctor(null);
                    setSelectedDate('');
                    setSelectedTime('');
                  }}
                  className="ml-auto text-sm text-primary-600 hover:text-primary-700"
                >
                  Cambiar médico
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecciona una Fecha *
              </label>
              <input
                type="date"
                className="input"
                min={minDate}
                max={maxDateStr}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Puedes agendar citas desde mañana hasta 3 meses adelante
              </p>
            </div>

            {selectedDate && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horarios Disponibles
                </label>
                {loadingSlots ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                    <p className="text-sm text-gray-500 mt-2">Cargando horarios...</p>
                  </div>
                ) : availableSlots.length === 0 ? (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                    <p className="text-yellow-800">
                      No hay horarios disponibles para esta fecha.
                    </p>
                    <p className="text-sm text-yellow-600 mt-1">
                      Por favor selecciona otra fecha.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => {
                          setSelectedTime(slot);
                          setStep(3);
                        }}
                        className={`py-3 px-4 rounded-lg border-2 transition-all ${
                          selectedTime === slot
                            ? 'border-primary-600 bg-primary-50 text-primary-700 font-semibold'
                            : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                        }`}
                      >
                        {formatTime(slot)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold">Resumen de la Cita</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Médico</p>
                  <p className="font-semibold">
                    Dr. {selectedDoctor.user.firstName} {selectedDoctor.user.lastName}
                  </p>
                  {selectedDoctor.specialty && (
                    <p className="text-sm text-gray-600">{selectedDoctor.specialty.name}</p>
                  )}
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Fecha y Hora</p>
                  <p className="font-semibold">
                    {new Date(selectedDate + 'T00:00:00').toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-primary-600 font-medium">
                    {formatTime(selectedTime)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                ← Modificar fecha u hora
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivo de la Consulta (Opcional)
              </label>
              <textarea
                rows="4"
                className="input"
                placeholder="Describe brevemente el motivo de tu consulta..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary flex-1"
              >
                {loading ? 'Agendando...' : 'Confirmar Cita'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/appointments')}
                className="btn btn-secondary"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewAppointment;
