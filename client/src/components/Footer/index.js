import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import '../../assets/css/style.css'

const Footer = () => {
  const location = useLocation();
  const history = useHistory();
  return (
  <footer class="text-muted py-3">
		<div class="container">
			<p class="float-end mb-1">
				<a href="#">Back to top</a>
			</p>
			<p class="mb-0">  
      <p>
        © 2021 Dollars 4 Scholars
      </p>
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => history.goBack()}
          >
            &larr; Go Back
          </button>
        )}
      </p>
		</div>
	</footer>
  );
};

export default Footer;