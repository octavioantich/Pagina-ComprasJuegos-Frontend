import { useEffect} from 'react';
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react';
import axios from 'axios';
import Log_Reg_Buy_Usuarios from '@/servicios/Log&Reg&Buy_Usuarios';
initMercadoPago('YOUR_PUBLIC_KEY');

export function PaymentForm ({ totalPrice, realizarCompra }){
    const initialization = {
        amount: totalPrice,
       };

  useEffect(() => {
    initMercadoPago('TEST-c3e16baa-37a1-4cbd-9ffe-f0d80847e8ae');
  }, []);

  const onSubmit = async (formData) => {
    // callback llamado al hacer clic en el botón enviar datos
    try {
      const compraApi = new Log_Reg_Buy_Usuarios();
        compraApi.mercadoPago(formData).then( response => {
        // recibir el resultado del pago
        if(response.data.status == "approved"){
          realizarCompra(true);
        }else{
          realizarCompra(false);
        }
      }).catch( error => {
          console.log(error);
      })
      } catch (error) {
      // manejar la respuesta de error al intentar crear el pago
      console.error(error);
    }
  };

  const onError = async (error) => {
    // callback llamado para todos los casos de error de Brick
    console.log(error);
  };

  const onReady = async () => {
    /*
      Callback llamado cuando Brick está listo.
      Aquí puedes ocultar cargamentos de su sitio, por ejemplo.
    */
  };

  return (
    <div>
      <CardPayment
        initialization={initialization}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
      />
    </div>
  );
};
