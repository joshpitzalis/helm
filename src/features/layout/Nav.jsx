export const Nav = ({ avatar }) => (
  <nav className="header_menu_15 pt-35 pb-30">
    <div className="container px-xl-0">
      <div className="row justify-content-center">
        <div className="col-xl-10">
          <div className="row justify-content-between align-items-baseline">
            <div className="col-xl-3 logo">
              <HelmLogo /> Helm
            </div>
            {/* {avatar && (
             <div className="col-xl-6 d-flex justify-content-center align-items-baseline medium">
               <Link to="/" className="mx-15 link color-heading underline ">
                 {' '}
                 Meetbox
               </Link>
                <Link to="/" className="mx-15 link color-heading o-50 ">
                 Rubbish Project
               </Link>
               <Link to="/" className="mx-15 link color-heading o-50 ">
                 Suzies
               </Link>
               <Link to="/" className="mx-15 link color-heading o-50 ">
                 + New
               </Link>
             </div>
            )} */}
            {avatar && (
              <div className="col-xl-3 d-flex justify-content-end align-items-center">
                <button
                  type="button"
                  className="mx-15 link medium action-1"
                  onClick={() => firebase.auth().signOut()}
                >
                  Logout
                </button>

                <Avatar src={avatar} size="large" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </nav>
);
Nav.propTypes = {
  avatar: PropTypes.string,
};
Nav.defaultProps = {
  avatar: '',
};

// mobile navigation

// <div className="navigation_mobile bg-dark type1 opened">
//   <a href="#" className="close_menu color-white">
//     <i className="fas fa-times" />
//   </a>
//   <div className="px-40 pt-60 pb-60 inner">
//     <div className="logo color-white mb-30">Startup 3</div>
//     <div>
//       <a href="#" className="f-heading f-22 link color-white mb-20">
//         Home
//       </a>
//     </div>
//     <div>
//       <a href="#" className="f-heading f-22 link color-white mb-20">
//         Tour
//       </a>
//     </div>
//     <div>
//       <a href="#" className="f-heading f-22 link color-white mb-20">
//         Mobile Apps
//       </a>
//     </div>
//     <div>
//       <a href="#" className="f-heading f-22 link color-white mb-20">
//         Pricing
//       </a>
//     </div>
//     <div>
//       <a href="#" className="f-heading f-22 link color-white mb-20">
//         Development
//       </a>
//     </div>
//     <div>
//       <a href="#" className="link color-white op-3 mb-15">
//         Help
//       </a>
//     </div>
//     <div>
//       <a href="#" className="link color-white op-3 mb-15">
//         F.A.Q.
//       </a>
//     </div>
//     <div>
//       <a href="#" className="link color-white op-3 mb-15">
//         Support
//       </a>
//     </div>
//     <div>
//       <a href="#" className="link color-white op-3 mb-15">
//         About Us
//       </a>
//     </div>
//     <div>
//       <a href="#" className="link color-white op-3 mb-15">
//         Blog
//       </a>
//     </div>
//     <div>
//       <a href="#" className="link color-white op-3 mb-15">
//         Careers
//       </a>
//     </div>

//     <div className="socials mt-40">
//       <a href="#" target="_blank" className="link color-white f-18 mr-20">
//         <i className="fab fa-twitter" />
//       </a>
//       <a href="#" target="_blank" className="link color-white f-18 mr-20">
//         <i className="fab fa-facebook" />
//       </a>
//       <a href="#" target="_blank" className="link color-white f-18 mr-20">
//         <i className="fab fa-google-plus-g" />
//       </a>
//     </div>

//     <div className="mt-50 f-14 light color-white op-3 copy">
//       &copy; 2019 Designmodo. All rights reserved.
//     </div>
//   </div>
// </div>;
