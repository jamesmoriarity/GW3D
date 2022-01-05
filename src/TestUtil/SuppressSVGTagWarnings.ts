export const suppressSVGTagWarnings = function(){
    const origError = console.error
    console.error = (...e:any[]) => {
      let s:String = String(e[0])
      if(s.includes("Warning: The tag") && s.includes("is unrecognized in this browser")){
        return
      }
      origError(e)
    }
}
