import React from "react"
import PropTypes from "prop-types"
import "./style.scss"

export default function PageError() {
  return (
    <div style={{ marginTop: 35 }} className="app flex-row align-items-center">
      <div
        className="justify-content-center"
        style={{ marginRight: "auto", marginLeft: "auto", display: "flex" }}
      >
        <div className="col-md-5">
          <div className="auth-form-wrap pt-xl-0 pt-70">
            <div className="auth-form w-xl-30 w-lg-65 w-sm-85 w-100 card pa-25 shadow-lg">
              <a className="auth-brand text-center d-block mb-45" href="/"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

PageError.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
}
