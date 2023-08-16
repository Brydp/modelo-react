import { useState } from "react";

function Contador( props )
{
    const [ contador, setContador ] = useState(0);

    function Aumenta()
    {
      setContador( contador + 1 );
    }
    function Diminuir()
    {
      setContador( contador - 1 );
    }

    return(
        <>
        <button onClick={Aumenta}>+</button>
    <span>{contador}</span>
    <button onClick={Diminuir}>-</button>
        </>
    )
}
export default Contador;