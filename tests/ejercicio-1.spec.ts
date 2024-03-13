import 'mocha';
import {expect} from 'chai';
import {Magazine, Publisher, Reader} from '../src/ejercicio-1.js';

describe('Observer con Reader y Publisher', () => {
  const mag1: Magazine = new Magazine("National Geo", new Date("13-03-2024"));
  const reader1: Reader = new Reader("Pepito", []);
  const reader2: Reader = new Reader("Juanito", []);
  const publisher1: Publisher<Magazine> = new Publisher<Magazine>("Panini", mag1);

  it("Suscribe y unsubscribe funciona correctamente", () =>{
    publisher1.subscribe(reader1);
    expect(publisher1.observers).to.include(reader1);
    expect(() => publisher1.subscribe(reader1)).to.throw('Already subscribed');
    publisher1.unsubscribe(reader1);
    expect(publisher1.observers).to.not.include(reader1);
    expect(() => publisher1.unsubscribe(reader1)).to.throw('Already unsubscribed');
  });

  it("Notify y update funciona correctamente", () => {
    publisher1.subscribe(reader1);
    publisher1.subscribe(reader2);
    publisher1.publish(mag1);
    expect(reader1.magCollection).to.include(mag1);
    expect(reader2.magCollection).to.include(mag1);
  });

});