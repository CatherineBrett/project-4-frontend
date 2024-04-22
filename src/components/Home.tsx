import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="hero is-large">
        <div className="hero-body">
          <div className="container">
            <p className="title has-text-white has-text-centered">
              Harborne Community Groups
            </p>
          </div>
        </div>
      </section>
      <section className="copy">
        <div className="has-text-white column is-8 is-offset-2 p-6">
          <p>
            Welcome to Harborne Community Groups! This app is for residents of
            my local area of Harborne, Birmingham, who are interested in finding
            out about informal community groups they might like to join. The
            idea for the app stems from my time working on a lottery-funded
            programme designed to build community and to reduce social isolation
            and loneliness. To make the app as accessible and inclusive as
            possible, anyone can view a group's information and the organiser's
            contact details. If you run a group and would like to add it to the
            app, you will need to <Link to="/signup">sign up</Link> for an
            account, or <Link to="/login">log in</Link> if you have an account
            already.
          </p>
        </div>
      </section>
    </>
  );
}

export default Home;
