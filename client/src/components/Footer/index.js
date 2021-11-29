import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import '../../assets/css/style.css'

const Footer = () => {
  const location = useLocation();
  const history = useHistory();
  return (
  <footer class="text-muted py-5">
		<div class="container">
			<p class="float-end mb-1">
				<a href="#">Back to top</a>
			</p>
			<p class="mb-0">  
        <h4>Made with{' '}
        <span
          className="emoji"
          role="img"
          aria-label="heart"
          aria-hidden="false"
        >
          ❤️
        </span>{' '}
        by the Tech Thoughts team.
        </h4>
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