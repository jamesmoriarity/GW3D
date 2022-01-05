import { store } from "../app/store";
import * as hooks from "../app/hooks"
export class SpyManager{
    spies:jest.SpyInstance[];
    dispatchSpy:jest.SpyInstance;
    constructor(){
      this.spies = []
      this.dispatchSpy = this.addSpy(store, "dispatch");
    }
    addSpy = (parent:any, methodName:string):jest.SpyInstance => {
      const spy:jest.SpyInstance = jest.spyOn(parent, methodName)
      this.spies.push(spy)
      return spy
    }
    restoreSpies = () => {
      jest.clearAllMocks()
      this.spies.forEach((spy:jest.SpyInstance) => {
        spy.mockRestore()
      });
      this.spies = []
    }
    getSpies = ():jest.SpyInstance[] => {
        return this.spies
    }
  }