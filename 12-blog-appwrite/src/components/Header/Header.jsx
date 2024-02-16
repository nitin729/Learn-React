import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-stone-300">
      <Container>
        <nav className="flex justify-between mx-8">
          <div className="mr-4">
            <Link>
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex">
            {navItems.map((navItem) =>
              navItem.active ? (
                <li key={navItem.name}>
                  <button
                    className="inline-block px-6 py-2 duration-200 hover:bg-black rounded-sm hover:text-white hover:rounded-md"
                    onClick={() => navigate(navItem.slug)}
                  >
                    <h3 className="text-xl">{navItem.name}</h3>
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
