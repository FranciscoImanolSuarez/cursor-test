import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Default translations
const defaultTranslations = {
  en: {
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit',
      reset: 'Reset',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      select: 'Select',
      clear: 'Clear',
      all: 'All',
      none: 'None',
      required: 'Required',
      optional: 'Optional',
      invalid: 'Invalid',
      valid: 'Valid',
    },
    form: {
      required: 'This field is required',
      email: 'Please enter a valid email address',
      password: 'Password must be at least 8 characters',
      confirmPassword: 'Passwords do not match',
      minLength: 'Must be at least {{min}} characters',
      maxLength: 'Must be no more than {{max}} characters',
      pattern: 'Please enter a valid value',
      url: 'Please enter a valid URL',
      number: 'Please enter a valid number',
      phone: 'Please enter a valid phone number',
    },
    validation: {
      required: 'This field is required',
      email: 'Invalid email address',
      min: 'Value must be at least {{min}}',
      max: 'Value must be no more than {{max}}',
      minLength: 'Must be at least {{min}} characters',
      maxLength: 'Must be no more than {{max}} characters',
      pattern: 'Invalid format',
      url: 'Invalid URL',
      number: 'Invalid number',
      phone: 'Invalid phone number',
    },
    pagination: {
      page: 'Page',
      of: 'of',
      showing: 'Showing',
      to: 'to',
      ofTotal: 'of {{total}} results',
      first: 'First page',
      last: 'Last page',
      previous: 'Previous page',
      next: 'Next page',
    },
    table: {
      noData: 'No data available',
      loading: 'Loading data...',
      error: 'Error loading data',
      empty: 'No results found',
      selectAll: 'Select all',
      deselectAll: 'Deselect all',
      selected: '{{count}} selected',
    },
    modal: {
      close: 'Close modal',
    },
    tooltip: {
      show: 'Show tooltip',
      hide: 'Hide tooltip',
    },
    dropdown: {
      open: 'Open dropdown',
      close: 'Close dropdown',
      select: 'Select option',
    },
    tabs: {
      tab: 'Tab',
      selected: 'Selected',
    },
    accordion: {
      expand: 'Expand section',
      collapse: 'Collapse section',
    },
  },
  es: {
    common: {
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      save: 'Guardar',
      delete: 'Eliminar',
      edit: 'Editar',
      close: 'Cerrar',
      back: 'Atrás',
      next: 'Siguiente',
      previous: 'Anterior',
      submit: 'Enviar',
      reset: 'Restablecer',
      search: 'Buscar',
      filter: 'Filtrar',
      sort: 'Ordenar',
      select: 'Seleccionar',
      clear: 'Limpiar',
      all: 'Todos',
      none: 'Ninguno',
      required: 'Requerido',
      optional: 'Opcional',
      invalid: 'Inválido',
      valid: 'Válido',
    },
    form: {
      required: 'Este campo es requerido',
      email: 'Por favor ingrese un email válido',
      password: 'La contraseña debe tener al menos 8 caracteres',
      confirmPassword: 'Las contraseñas no coinciden',
      minLength: 'Debe tener al menos {{min}} caracteres',
      maxLength: 'Debe tener máximo {{max}} caracteres',
      pattern: 'Por favor ingrese un valor válido',
      url: 'Por favor ingrese una URL válida',
      number: 'Por favor ingrese un número válido',
      phone: 'Por favor ingrese un teléfono válido',
    },
    validation: {
      required: 'Este campo es requerido',
      email: 'Dirección de email inválida',
      min: 'El valor debe ser al menos {{min}}',
      max: 'El valor debe ser máximo {{max}}',
      minLength: 'Debe tener al menos {{min}} caracteres',
      maxLength: 'Debe tener máximo {{max}} caracteres',
      pattern: 'Formato inválido',
      url: 'URL inválida',
      number: 'Número inválido',
      phone: 'Teléfono inválido',
    },
    pagination: {
      page: 'Página',
      of: 'de',
      showing: 'Mostrando',
      to: 'a',
      ofTotal: 'de {{total}} resultados',
      first: 'Primera página',
      last: 'Última página',
      previous: 'Página anterior',
      next: 'Página siguiente',
    },
    table: {
      noData: 'No hay datos disponibles',
      loading: 'Cargando datos...',
      error: 'Error al cargar datos',
      empty: 'No se encontraron resultados',
      selectAll: 'Seleccionar todo',
      deselectAll: 'Deseleccionar todo',
      selected: '{{count}} seleccionado',
    },
    modal: {
      close: 'Cerrar modal',
    },
    tooltip: {
      show: 'Mostrar tooltip',
      hide: 'Ocultar tooltip',
    },
    dropdown: {
      open: 'Abrir dropdown',
      close: 'Cerrar dropdown',
      select: 'Seleccionar opción',
    },
    tabs: {
      tab: 'Pestaña',
      selected: 'Seleccionado',
    },
    accordion: {
      expand: 'Expandir sección',
      collapse: 'Colapsar sección',
    },
  },
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources: defaultTranslations,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

// Helper function to add new translations
export function addTranslations(namespace: string, translations: Record<string, any>) {
  Object.keys(translations).forEach((language) => {
    i18n.addResourceBundle(language, namespace, translations[language], true, true);
  });
}

// Helper function to change language
export function changeLanguage(language: string) {
  return i18n.changeLanguage(language);
}

// Helper function to get current language
export function getCurrentLanguage(): string {
  return i18n.language;
}

// Helper function to get available languages
export function getAvailableLanguages(): string[] {
  return Object.keys(i18n.options.resources || {});
}