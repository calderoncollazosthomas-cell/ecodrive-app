
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CalendarDay {
  date: Date;
  day: number;
  disabled: boolean;
}

interface Recycler {
  id: number;
  name: string;
  rating: string;
}

interface Appointment {
  id: number;
  date: string;
  materials: string[];
  recycler: string;
}

@Component({
  selector: 'app-agendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agendar.html',
  styleUrl: './agendar.scss'
})
export class Agendar {

  // Fecha actual
  today = new Date();

  currentMonth = new Date(
    this.today.getFullYear(),
    this.today.getMonth(),
    1
  );

  selectedDate: Date | null = null;

  // Calendario
  calendarDays: (CalendarDay | null)[] = [];

  weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  // Materiales disponibles
  materials = [
    { name: 'Papel', icon: '📄' },
    { name: 'Cartón', icon: '📦' },
    { name: 'Vidrio', icon: '🍾' },
    { name: 'Lata', icon: '🥫' }
  ];

  selectedMaterials: string[] = [];

  // Recicladores disponibles
  recyclers: Recycler[] = [
    { id: 1, name: 'Juan Pérez', rating: '4.9' },
    { id: 2, name: 'María López', rating: '5.0' }
  ];

  selectedRecycler: number | null = null;

  // Mensajes
  errorMessage = '';
  showSuccessModal = false;

  // Información de la cita confirmada
  confirmedAppointment: Appointment | null = null;

  // Historial de citas agendadas
  appointments: Appointment[] = [];

  constructor() {
    this.generateCalendar();
  }

  // Nombre del mes
  get monthName(): string {
    return this.currentMonth.toLocaleDateString('es-CO', {
      month: 'long',
      year: 'numeric'
    });
  }

  // Generar calendario
  generateCalendar(): void {
    this.calendarDays = [];

    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    // La semana comienza el lunes
    const emptyDays = (firstDay + 6) % 7;

    for (let i = 0; i < emptyDays; i++) {
      this.calendarDays.push(null);
    }

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, month, day);

      this.calendarDays.push({
        date,
        day,
        disabled: this.isPastDate(date)
      });
    }
  }

  // Comprobar fechas anteriores
  isPastDate(date: Date): boolean {
    const selected = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    const today = new Date(
      this.today.getFullYear(),
      this.today.getMonth(),
      this.today.getDate()
    );

    return selected < today;
  }

  // Cambiar de mes
  changeMonth(amount: number): void {
    const newMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + amount,
      1
    );

    const firstAllowedMonth = new Date(
      this.today.getFullYear(),
      this.today.getMonth(),
      1
    );

    if (newMonth < firstAllowedMonth) {
      return;
    }

    this.currentMonth = newMonth;
    this.selectedDate = null;
    this.generateCalendar();
  }

  // Seleccionar fecha
  selectDate(day: CalendarDay | null): void {
    if (!day || day.disabled) {
      return;
    }

    this.selectedDate = day.date;
    this.errorMessage = '';
  }

  // Comprobar fecha seleccionada
  isSelected(day: CalendarDay | null): boolean {
    if (!day || !this.selectedDate) {
      return false;
    }

    return day.date.getTime() === this.selectedDate.getTime();
  }

  // Seleccionar o quitar materiales
  toggleMaterial(material: string): void {
    if (this.selectedMaterials.includes(material)) {
      this.selectedMaterials = this.selectedMaterials.filter(
        item => item !== material
      );
    } else {
      this.selectedMaterials = [
        ...this.selectedMaterials,
        material
      ];
    }

    this.errorMessage = '';
  }

  // Seleccionar reciclador
  selectRecycler(id: number): void {
    this.selectedRecycler = id;
    this.errorMessage = '';
  }

  // Confirmar cita
  confirmAppointment(): void {

    if (!this.selectedDate) {
      this.errorMessage =
        'Por favor, selecciona una fecha para tu recolección.';
      return;
    }

    if (this.selectedMaterials.length === 0) {
      this.errorMessage =
        'Selecciona al menos un material reciclable.';
      return;
    }

    if (!this.selectedRecycler) {
      this.errorMessage =
        'Selecciona el reciclador de tu preferencia.';
      return;
    }

    const recycler = this.recyclers.find(
      item => item.id === this.selectedRecycler
    );

    if (!recycler) {
      return;
    }

    // Crear la información de la cita
    const newAppointment: Appointment = {
      id: Date.now(),
      date: this.selectedDate.toLocaleDateString('es-CO', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      materials: [...this.selectedMaterials],
      recycler: recycler.name
    };

    // Guardar en la lista de citas
    this.appointments = [
      ...this.appointments,
      newAppointment
    ];

    // Mostrar confirmación
    this.confirmedAppointment = newAppointment;

    this.errorMessage = '';
    this.showSuccessModal = true;
  }

  // Cerrar ventana emergente
  closeModal(): void {
    this.showSuccessModal = false;

    this.selectedDate = null;
    this.selectedMaterials = [];
    this.selectedRecycler = null;

    this.confirmedAppointment = null;
  }

}
