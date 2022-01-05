import "./GridOutlines.css"
export function GridOutlines() {
  return (
    <>
    <g className="cell-lines">
      <g className="cell-lines-horizontal">
        <rect/>
        <rect/>
        <rect/>
        <rect/>
        <rect/>
        <rect/>
        <rect/>
        <rect/>
        <rect/>
        <rect/>
      </g>
      <g className="cell-lines-vertical">
        <rect/>
        <rect/>
        <rect/>
        <rect/>
        <rect/>
        <rect/>
        <rect/>
        <rect/>
        <rect/>
        <rect/>
      </g>
    </g>   
    <g className="outlines">
      <g className="lines-horizontal">
        <rect/>
        <rect/>
        <rect/>
        <rect/>
      </g>
      <g className="lines-vertical">
        <rect/>
        <rect/>
        <rect/>
        <rect/>
      </g>
    </g>
    </>
  );
}

