import * as hooks from "../app/hooks"
import { SpyManager } from "./SpyManager"

describe('Spy Manager', () => {
    it("lives", ()=>{
        let sm:SpyManager = new SpyManager()
        let initCount:number = sm.spies.length
        sm.restoreSpies()
        expect(sm.getSpies().length).toBe(0)
    })
})