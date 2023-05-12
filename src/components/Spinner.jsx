import PropTypes from "prop-types"

export function Spinner({ className }) {
   return (
      <div className={"spinner " + className}></div>
   )
}

Spinner.propTypes = {
   className: PropTypes.string
}