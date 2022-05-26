/** 
  All of the routes for the Material Kit 2 React React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Navbar.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `name` key is used for the name of the route on the Navbar.
  2. The `icon` key is used for the icon of the route on the Navbar.
  3. The `collapse` key is used for making a collapsible item on the Navbar that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  4. The `route` key is used to store the route location which is used for the react router.
  5. The `href` key is used to store the external links location.
  6. The `component` key is used to store the component of its route.
  7. The `dropdown` key is used to define that the item should open a dropdown for its collapse items .
  8. The `description` key is used to define the description of
          a route under its name.
  9. The `columns` key is used to define that how the content should look inside the dropdown menu as columns,
          you can set the columns amount based on this key.
  10. The `rowsPerColumn` key is used to define that how many rows should be in a column.
*/

// Pages
import UserSignIn from "layouts/pages/authentication/user-sign-in";
import VetSignIn from "layouts/pages/authentication/vet-sign-in";

import AboutUs from "layouts/pages/about-us";
import ContactUs from "layouts/pages/contact-us";

import Appointment from "layouts/pages/appointment";
import Article from "layouts/pages/article";
import Inventory from "layouts/pages/inventory";
import Pet from "layouts/pages/pet";
import Prescription from "layouts/pages/prescription";
import Transport from "layouts/pages/transport";
import Vet from "layouts/pages/vet";
import User from "layouts/pages/user";

// import Author from "layouts/pages/author";

// Sections
// import PageHeaders from "layouts/sections/page-sections/page-headers";
// import Features from "layouts/sections/page-sections/featuers";
// import Navbars from "layouts/sections/navigation/navbars";
// import NavTabs from "layouts/sections/navigation/nav-tabs";
// import Pagination from "layouts/sections/navigation/pagination";
// import Inputs from "layouts/sections/input-areas/inputs";
// import Forms from "layouts/sections/input-areas/forms";
// import Alerts from "layouts/sections/attention-catchers/alerts";
// import Modals from "layouts/sections/attention-catchers/modals";
// import TooltipsPopovers from "layouts/sections/attention-catchers/tooltips-popovers";
// import Avatars from "layouts/sections/elements/avatars";
// import Badges from "layouts/sections/elements/badges";
// import BreadcrumbsEl from "layouts/sections/elements/breadcrumbs";
// import Buttons from "layouts/sections/elements/buttons";
// import Dropdowns from "layouts/sections/elements/dropdowns";
// import ProgressBars from "layouts/sections/elements/progress-bars";
// import Toggles from "layouts/sections/elements/toggles";
// import Typography from "layouts/sections/elements/typography";

const routes = [
  {
    name: "Appointment",
    collapse: [
      {
        name: "Appointment",
        icon: <i className="fa-solid fa-newspaper" />,
        route: "/pages/appointment",
        component: <Appointment />,
      },
      {
        name: "Transport",
        icon: <i className="fa-solid fa-newspaper" />,
        route: "/pages/transport",
        component: <Transport />,
      },
    ],
  },
  {
    name: "Medicine",
    collapse: [
      {
        name: "Inventory",
        icon: <i className="fa-solid fa-newspaper" />,
        route: "/pages/inventory",
        component: <Inventory />,
      },
      {
        name: "Prescription",
        icon: <i className="fa-solid fa-newspaper" />,
        route: "/pages/prescription",
        component: <Prescription />,
      },
    ],
  },
  {
    name: "Pet",
    icon: <i className="fa-solid fa-paw" />,
    route: "/pages/pet",
    component: <Pet />,
  },
  {
    name: "User",
    icon: <i className="fa-solid fa-user" />,
    route: "/pages/user",
    component: <User />,
  },
  {
    name: "Vet",
    icon: <i className="fa-solid fa-user-doctor" />,
    route: "/pages/vet",
    component: <Vet />,
  },
  {
    name: "articles",
    icon: <i className="fa-solid fa-newspaper" />,
    route: "/pages/articles",
    component: <Article />,
  },
  {
    name: "about us",
    icon: <i className="fa-solid fa-hospital" />,
    route: "/pages/about-us",
    component: <AboutUs />,
  },
  {
    name: "contact us",
    icon: <i className="fa-solid fa-address-book" />,
    route: "/pages/contact-us",
    component: <ContactUs />,
  },
  {
    name: "User Management",
    collapse: [
      {
        name: "User Sign In",
        icon: <i className="fa-solid fa-user" />,
        route: "/pages/authentication/user-sign-in",
        component: <UserSignIn />,
      },
      {
        name: "Vet Sign In",
        icon: <i className="fa-solid fa-user-doctor" />,
        route: "/pages/authentication/vet-sign-in",
        component: <VetSignIn />,
      },
    ],
  },
];

export default routes;
