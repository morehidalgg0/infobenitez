# InmoPanel - Panel de Gestión Inmobiliaria

Panel integral de gestión operativa y comercial para inmobiliarias, agentes de bienes raíces y administración de propiedades.

---

## 🌟 Funcionalidades Principales

1. **Gestión de Propiedades & Casas**:
   - Catálogo completo con fotos en alta resolución.
   - Clasificación por tipo de operación (*Venta, Alquiler Tradicional, Alquiler Temporal*), tipo de inmueble (*Casa, Depto, PH, Terreno, Local*) y estado (*Disponible, Reservada, Alquilada, Vendida, Pausada*).
   - Filtros avanzados por barrios, rango de precios, ambientes y agente a cargo.
   - Vista en **Cuadrícula** y **Tabla compacta**.

2. **Descarga Directa de Fotografías**:
   - Descarga individual de cada foto en alta resolución.
   - Descarga en lote de todas las fotos de la propiedad para que los agentes las compartan directamente con clientes.

3. **Calendario Interactivo de Alquileres & Disponibilidad**:
   - Navegación visual por meses.
   - Identificación de contratos de alquiler vigentes (indicando canon mensual).
   - Identificación de reservas y señas en curso (indicando por cuánto señaron y vigencia límite).
   - Consulta rápida de fechas disponibles.

4. **Operativa, Seguridad & Control de Llaves y Alarmas**:
   - **Custodia de Llaves en Tiempo Real**: Registro de quién tiene la llave actualmente con botones rápidos para *"Me llevo la llave"* y *"Devolver a Oficina"*.
   - **Códigos de Seguridad**: Contraseña de alarma con botón de copiado con un clic, código de portón/lockbox y clave de WiFi.
   - **Manual Operativo de la Casa**: Indicaciones críticas de la propiedad (bomba de piscina, caldera, mascotas, reglas de consorcio).
   - **Tablero Central de Llaves & Alarma**: Vista general de todas las llaves y códigos en una sola pantalla.

5. **Modo Agente vs. Modo Presentación al Cliente**:
   - Interruptor instantáneo para ocultar todos los datos sensibles (dueños, llaves, contraseñas de alarma y comisiones) para proyectar en reuniones o compartir pantalla sin riesgos.

6. **Control de Señas & Alquileres**:
   - Pase directo de Reserva a Venta o Alquiler con 1 clic.
   - Control de cobros mensuales y métodos de ajuste (IPC, ICL, Fijo USD).
   - Compartir ficha formateada por WhatsApp o imprimir en PDF.

---

## 🚀 Instalación y Puesta en Marcha

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>

# 2. Entrar a la carpeta
cd inmobiliaria-panel

# 3. Instalar dependencias
npm install

# 4. Iniciar servidor de desarrollo
npm run dev

# 5. Generar build de producción
npm run build
```

---

## 💻 Tecnologías Utilizadas

- **React 18**
- **Vite**
- **Tailwind CSS**
- **Lucide Icons**
- **LocalStorage API** con persistencia y exportación/importación JSON.
