import { Link } from "react-router-dom";
import peepone from "../assets/peepone.png";
import peeptwo from "../assets/peeptwo.png"

function Home() {
  return (
    <>
      <section className="hero is-fullheight-with-navbar pb-0">
        <div className="hero-body pb-0">
          <div className="columns">
            <div className="column is-flex is-justify-content-flex-end is-one-third">
              <img src={peeptwo} className="homepeeptwo" />
            </div>
            <div className="column is-one-third">
              <h1 className="title has-text-success has-text-centered is-size-1 has-text-weight-bold">
                Harborne Community Groups
              </h1>
              <p className="is-size-5 has-text-grey-dark has-text-centered has-text-weight-bold mb-4">
                Welcome to Harborne Community Groups! This app is for residents
                of my local area of Harborne, Birmingham, who are interested in
                finding out about informal community groups they might like to
                join.
              </p>
              <p className="is-size-6 has-text-grey-dark has-text-centered mb-4">
                The idea for the app stems from my time working on a
                lottery-funded programme designed to build community and to
                reduce social isolation and loneliness.
              </p>
              <p className="is-size-6 has-text-grey-dark has-text-centered">
                To make the app as accessible and inclusive as possible, anyone
                can view a group's information and the organiser's contact
                details. If you run a group and would like to add it to the app,
                you will need to <Link className="has-text-weight-bold" to="/signup">sign up</Link> for an
                account, or <Link className="has-text-weight-bold" to="/login">log in</Link> if you have an
                account already.
              </p>
            </div>
            <div className="column is-flex is-one-third">
              <img src={peepone} className="homepeepone" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
