/*
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