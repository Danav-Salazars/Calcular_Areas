const { useState } = React;

function Figuras() {
  const [figura, setFigura] = useState('triangulo');
  const [medida1, setMedida1] = useState('');
  const [medida2, setMedida2] = useState('');
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const calcular = (e) => {
    e.preventDefault();
    setMostrarResultado(true);
  };

  const limpiar = () => {
    setFigura('triangulo');
    setMedida1('');
    setMedida2('');
    setMostrarResultado(false);
  };

  const esCuadrado = figura === 'cuadrado';

  const m1 = parseFloat(medida1);
  const m2 = esCuadrado ? m1 : parseFloat(medida2);
  const esValido = medida1 !== '' && !isNaN(m1) && (esCuadrado || (medida2 !== '' && !isNaN(m2)));

  let area = null;
  if (esValido) {
    if (figura === 'triangulo') area = (m1 * m2) / 2;
    if (figura === 'rectangulo') area = m1 * m2;
    if (figura === 'cuadrado') area = m1 * m1;
  }

  const etiquetas = {
    triangulo: ['Base', 'Altura'],
    rectangulo: ['Base', 'Altura'],
    cuadrado: ['Lado', 'No aplica'],
  };

  return (
    <div className="contenedor">
      <h1>Calculadora de áreas</h1>
      <p className="ayuda">Elige una figura e ingresa sus medidas en centímetros.</p>

      <form onSubmit={calcular}>
        <select
          value={figura}
          onChange={(e) => {
            setFigura(e.target.value);
            setMostrarResultado(false);
          }}
        >
          <option value="triangulo">Triángulo</option>
          <option value="rectangulo">Rectángulo</option>
          <option value="cuadrado">Cuadrado</option>
        </select>

        <input
          type="number"
          placeholder={etiquetas[figura][0]}
          value={medida1}
          onChange={(e) => {
            setMedida1(e.target.value);
            setMostrarResultado(false);
          }}
        />

        <input
          type="number"
          placeholder={etiquetas[figura][1]}
          value={esCuadrado ? '' : medida2}
          onChange={(e) => {
            setMedida2(e.target.value);
            setMostrarResultado(false);
          }}
          disabled={esCuadrado}
        />

        <div className="botones">
          <button type="submit">Calcular</button>
          <button type="button" className="secundario" onClick={limpiar}>
            Limpiar
          </button>
        </div>
      </form>

      {mostrarResultado && (
        <p className="resultado">
          {esValido ? `Área: ${area.toFixed(2)} cm²` : 'Ingresa medidas válidas'}
        </p>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Figuras />);