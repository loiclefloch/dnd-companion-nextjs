// import assert from "assert";
import {getDebugActionApi} from './debugDefinitions'
import { acidArrow } from "./definitions"

describe("acidArrow", () => {
  it("should make damages", () => {
    const action =  acidArrow.action
    const actionApi = getDebugActionApi()

    const context = actionApi.context()
  })
})
