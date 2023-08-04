import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Privacy = ({ auth }) => {
  // const { id } = useParams();

  const { pathname } = useLocation();
  const mystyle = {
    margin: 'auto',
    fontWeight: 'bold',
    fontFamily: 'roboto',
    color: 'grey',
    display: 'inline'
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <section className="container privacyContainer">
      <div className="row privacy-title">Privacy Policy & Terms of Use</div>
      <div className="row">
        <div className="col-md-12 privacy-guid">
          <p className="termUseP termSubject">
            At lawsearch.ai, we respect your privacy and are committed to
            protecting your personal information.
          </p>
          <p className="termUseP termSubject">
            This policy explains how we collect, use, and protect your data when
            you use our service.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 privacy-guid">
          <p className="termUseP termSubject">What Information We Collect:</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 privacy-guid">
          <p className="termUseP">
            When you use our service, we may collect certain information,
            including:
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 privacy-guid">
          <ul className="termUseP">
            <li>Your name and email address</li>
            <li>Your IP address and device information</li>
            <li>Your chat history and usage data</li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 privacy-guid">
          <p className="termUseP termSubject">How We Use Your Information:</p>
          <p className="termUseP">
            We use your information to provide and improve our service, and to
            communicate with you about our products and services. We may also
            use your data for research and analytics purposes.
          </p>
          <p className="termUseP termSubject">
            How We Protect Your Information:
          </p>
          <p className="termUseP">
            We take the security of your data seriously and use appropriate
            measures to protect it from unauthorized access, disclosure, or
            misuse. lawsearch.ai has measures in place to ensure that all
            customer data is encrypted and stored securely on cloud servers.
            These servers are only accessible to authorized personnel who are
            bound by confidentiality agreements. We also ensure that our
            employees and third-party service providers comply with strict
            confidentiality and data protection policies.
          </p>
          <p className="termUseP termSubject">Sharing Your Information:</p>
          <p className="termUseP">
            We do not sell or rent your personal information to third parties.
            However, we may share your data with trusted third-party service
            providers to perform certain functions, such as hosting our website,
            processing payments, or providing customer support. We also may
            disclose your data if required by law or to protect our legal
            rights.
          </p>
          <p className="termUseP termSubject">Changes to This Policy:</p>
          <p className="termUseP">
            We may update this policy from time to time to reflect changes in
            our practices or applicable laws. We encourage you to review this
            policy periodically for any updates.
          </p>
          <p className="termUseP termSubject">Contact Us:</p>
          <p className="termUseP">
            If you have any questions or concerns about our privacy practices,
            please contact us at info@lawsearch.ai.
          </p>
          <p className="termUseP termSubject">
            Content Generated from Searches IS NOT LEGAL ADVICE:
          </p>
          <p className="termUseP">
            The Service and all Content are provided for general informational
            purposes only, and may not reflect current legal developments,
            verdicts or settlements. Any information contained in the Content or
            this Service should not be construed as legal advice and is not
            intended to be a substitute for legal counsel on any subject matter.
            No recipient of Content from the Service should act or refrain from
            acting on the basis of any Content included in, or accessible
            through, the Service without seeking the appropriate legal or other
            professional advice on the particular facts and circumstances at
            issue from a lawyer licensed in the recipient's state, country or
            other appropriate licensing jurisdiction.
          </p>
          <p className="termUseP termSubject">INDEMNITY:</p>
          <p className="termUseP">
            You agree to indemnify and hold Geronimo Commerce Pty Ltd and
            lawsearch.ai, and its subsidiaries, affiliates, employees,
            information providers, partners, licensors, agents, co-branders,
            officers, directors, owners and employees, harmless from any claim
            or demand, including reasonable attorneys' fees, made by any third
            party due to or arising out of Content you submit, post, transmit or
            make available through the Service, your use of the Service, your
            connection to the Service, your violation of the TOS, or your
            violation of any rights of another.
          </p>
          <p className="termUseP">
            The Service may provide, or third parties may provide, links to
            other World Wide Web sites or resources. Your use of each of those
            sites is subject to the conditions, if any, that each of those sites
            has posted. Because lawsearch.ai has no control over such sites and
            resources, you acknowledge and agree that lawsearch.ai is not
            responsible for the availability of such external sites or
            resources, and does not endorse and is not responsible or liable for
            any Content, advertising, products, or other materials on or
            available from such sites or resources. You further acknowledge and
            agree that lawsearch.ai shall not be responsible or liable, directly
            or indirectly, for any damage or loss caused or alleged to be caused
            by or in connection with use of or reliance on any such Content,
            goods or services available on or through any such site or resource.
          </p>
        </div>
      </div>
      <div className="row footer">
        <div className="col-md-12 privacy-footer">
          <Link to="/privacy">
            <b className="privacy-link">Privacy Policy & Terms of Use</b>
          </Link>
          <p className="termUseP" style={mystyle}>
            ©2023 by lawsearch.ai
          </p>
        </div>
      </div>
    </section>
  );
};

Privacy.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  // profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps)(Privacy);
