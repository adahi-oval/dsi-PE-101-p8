/*
Implemente un sistema de notificación de eventos genéricos haciendo uso del patrón Observable.

Para ello, en primer lugar, defina una interfaz genérica Event<T> cuyo parámetro de tipo genérico T permita definir eventos de diferente tipo (entre otros posibles atributos, al menos, debe haber un atributo denominado data de tipo T). Estos eventos genéricos son los que deberá notificar un objeto Observable a los objetos Observer suscritos.

Luego, piense que sus interfaces Observer y Observable también deberán ser interfaces genéricas basadas en dicho parámetro de tipo T, y que los correspondientes métodos update de Observer y notify de Observable, deberán recibir como argumento un objeto Event<T>, esto es, el evento genérico a ser notificado.

Por último, piense que la clase que implementa la interfaz Observable debe ser una clase genérica, mientras que la clase que implementa la interfaz Observer ya puede ser una clase concreta.

Todo el código fuente deberá ser desarrollado haciendo uso de módulos ESM, en lugar de módulos CJS, que es lo que ha venido utilizando hasta ahora.

Por último, recuerde que deberá incluir la documentación haciendo uso de TypeDoc, así como seguir una metodología TDD/BDD utilizando el framework de pruebas Mocha y la librería de aserciones Chai. También trate de comprobar el nivel de cubrimiento de su código mediante c8, hacer un seguimiento de dicho cubrimiento con Coveralls y activar el proyecto en Sonar Cloud. Para ello, utilice los flujos de trabajo de GitHub, tal y como se ha visto en clase.
*/

/**
 * Interfaz generica para los eventos
 */
export interface Event<T> {
  id: string,
  data: T
}

/**
 * Objeto para instanciar los eventos 
 */
export class Magazine implements Event<Date> {
  constructor(public id: string, public data: Date) {}
}

/**
 * Interfaz genérica para los objetos observables 
 */
export interface Observable<T> {
  subscribe(observer: Observer<T>): void,
  unsubscribe(observer: Observer<T>): void,
  notify(event: T): void
}

/**
 * Interfaz genérica para los observadores
 */
export interface Observer<T> {
  update(event: T): void
}

/**
 * Clase Editorial que implementa observable
 */
export class Publisher<T> implements Observable<T> {
  public observers: Observer<T>[] = [];
  
  constructor(private id: string, private data: T) {}

  /**
   * Método para suscribir observadores
   * @param observer Observador suscrito
   */
  subscribe(observer: Observer<T>): void {
    if(this.observers.includes(observer)) {
      throw new Error('Already subscribed');
    }
    else {
      this.observers.push(observer);
    }
  }

  /**
   * Método para desuscribir observadores
   * @param observer Obervador a desuscribir
   */
  unsubscribe(observer: Observer<T>): void {
    const index = this.observers.indexOf(observer);
    if (index == -1) {
      throw new Error('Already unsubscribed');
    }
    else {
      this.observers.splice(index, 1);
    }
  }

  /**
   * Método para notificar observadores
   * @param event Evento a notificar
   */
  notify(event: T) {
    this.observers.forEach((observer) => observer.update(event));
  }

  /**
   * Método que llama a notify
   */
  publish(mag: T): void {
    this.notify(mag);
  }
}

/**
 * Clase Lector, observadora de Revistas con una fecha
 */
export class Reader implements Observer<Magazine> {
  constructor(private name: string, public magCollection: Magazine[]) {}

  /**
   * Método para añadir a la colección del lector la nueva revista
   * @param event El nuevo evento
   */
  update(event: Magazine): void {
    this.magCollection.push(event);
  }
}