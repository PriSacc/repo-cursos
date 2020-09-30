import { 
  reducerDestinosViajes,
  DestinosViajesState,
  initializeDestinosViajesState,
  InitMyDataAction,
  NuevoDestinoAction
} from './destinos-viajes-state.models';
import { DestinoViajes } from './destino-viaje.models';

describe('reducerDestinosViajes', () => { //testeamos puntualmente a reducerDestinosViajes
  it('should reduce init data', () => { //testeamos la inicialización de datos
    //setup - armo los obj para testear (inicialización)
    const prevState: DestinosViajesState = initializeDestinosViajesState();
    const action: InitMyDataAction = new InitMyDataAction(['destino 1', 'destino 2']);
    //action - accionar sobre el código, hacer interactuar los obj del setup
    const newState: DestinosViajesState = reducerDestinosViajes(prevState, action);
    //assert - sobre el valor retornado del código del action, se valida la salida esperada
    expect(newState.items.length).toEqual(2); //lo inicialicé con 2 destinos, por eso 2
    expect(newState.items[0].nombre).toEqual('destino 1'); //que el primer item tenga el nombre destino 1
    //teardown - para borrar lo que se insertó en una tabla en la prueba --> volver hacia atrás
  });

  it('should reduce new item added', () => {
    //setup
    const prevState: DestinosViajesState = initializeDestinosViajesState();
    const action: NuevoDestinoAction = new NuevoDestinoAction(new DestinoViajes('barcelona','url'));
    //action
    const newState: DestinosViajesState = reducerDestinosViajes(prevState, action);
    //assert
    expect(newState.items.length).toEqual(1);
    expect(newState.items[0].nombre).toEqual('barcelona');
  }); 
});