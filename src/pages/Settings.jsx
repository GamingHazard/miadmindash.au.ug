import React from "react";
import "w3-css/w3.css";
import pic from "../assets/profile.jpg";
import { CameraAltRounded, Close } from "@mui/icons-material";
function SettingsPage() {
  return (
    <div>
      <div>
        <h2 style={{ color: "lightgrey" }}>Security</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <div
            className="w3-card"
            style={{
              borderRadius: 20,
              marginBottom: 10,
              padding: 10,
              width: "100%",
              height: 330,
              textAlign: "center",
              margin: 10,
              width: 330,
            }}
          >
            <h3>Set backup email</h3>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo omnis
            assumenda obcaecati ducimus dolorem? Dignissimos aliquid similique
            <br />
            <br />
            <input type="email" placeholder="enter email" />
            <br />
            <br />
            <button>save</button>
          </div>
          <div
            className="w3-card"
            style={{
              borderRadius: 20,
              marginBottom: 10,
              padding: 10,
              width: "100%",
              height: 300,
              textAlign: "center",
              margin: 10,
              width: 300,
            }}
          >
            <h3>change password</h3>
            <input type="password" placeholder="enter old password" />
            <br />
            <br />
            <input type="password" placeholder="enter new password" />
            <br />
            <br />
            <input type="password" placeholder="comfirm new password" />
            <br />
            <br />

            <button>save</button>
          </div>
          <div
            className="w3-card"
            style={{
              borderRadius: 20,
              marginBottom: 10,
              padding: 10,
              width: "100%",
              height: 330,
              textAlign: "center",
              margin: 10,
              width: 330,
            }}
          >
            <h3>Delete Account</h3>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo omnis
            assumenda obcaecati ducimus dolorem? Dignissimos aliquid similique
            <br />
            <br />
            <input type="password" placeholder="enter password to continue" />
            <br />
            <br />
            <button disabled={true}>Delete</button>
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div>
          {" "}
          <h2 style={{ color: "lightgrey" }}>Account</h2>
          <label>name</label>
          <br />
          <input disabled={true} value={"john do3"} type="email" />{" "}
          <button>change</button>
          <br />
          <br />
          <label>Contact</label>
          <br />
          <input disabled={true} value={"+256 769-398-201"} type="email" />{" "}
          <button>change</button>
          <br />
          <br />
          <label>email</label>
          <br />
          <input
            disabled={true}
            value={"johndev@gmail.com"}
            type="email"
          />{" "}
          <button>change</button>
        </div>
      </div>
      <span style={{ display: "flex" }}>
        <h2 style={{ color: "lightgrey", flex: 1 }}>Terms & Conditions</h2>
        <button>Edit</button>
      </span>
      <div style={{ width: "100%", height: 400 }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
        repudiandae minima quos quasi sit omnis ad repellat alias, porro ducimus
        sapiente cupiditate pariatur architecto nisi eos excepturi harum illum
        voluptate. Quae consequatur nemo libero eligendi corrupti voluptates quo
        molestiae quaerat perferendis eos dolorem omnis inventore itaque facere
        sint repellendus at, nobis vitae voluptate, ipsa placeat deserunt illo
        delectus quidem. Obcaecati. Nulla neque culpa praesentium accusantium
        cum, in perferendis molestiae fuga. Alias enim nisi dolore omnis
        suscipit voluptas earum, magni architecto et maiores praesentium sint
        autem reiciendis odit voluptatum numquam minus. Sint odio officia
        voluptate fugiat aliquam minima hic perferendis quas sunt nobis
        obcaecati ut tenetur in deleniti inventore est dicta iste maiores quis,
        voluptatem cumque. Cupiditate ut iure vero rem! Laboriosam tempora
        mollitia itaque. Accusamus deserunt enim at animi, quia iusto officia.
        Placeat veritatis quas quaerat vero nisi, accusamus id, obcaecati fugit
        reprehenderit dolor quisquam aliquid veniam. Tempora, repudiandae ullam?
        Beatae quia aliquam voluptates explicabo ut hic? Quos explicabo tempore,
        velit repudiandae molestiae sequi maxime culpa quas officia
        necessitatibus assumenda et, accusantium adipisci eligendi ratione
        perspiciatis molestias earum quisquam numquam? Laudantium eaque aut
        repudiandae laborum, explicabo eos, asperiores accusamus inventore quae
        recusandae illum, amet architecto iste! Voluptatem sint quisquam neque
        et qui doloremque excepturi consequatur corrupti. Optio quidem maxime
        incidunt! Vitae veniam facilis qui autem ad reprehenderit maxime magnam
        et illo. Reprehenderit nobis repudiandae blanditiis velit accusamus, aut
        non vitae quibusdam beatae, ipsa eius? Ad, dolores. Voluptate sint
        necessitatibus quo! Aliquid, eius dolor natus, tempora, dolore earum
        perferendis nostrum consequuntur ab quis repellat. Et natus quae sequi
        incidunt fugiat ad, eaque nesciunt rem odit doloremque debitis
        voluptatem dignissimos possimus cumque. Sed consequuntur totam corrupti
        molestias dolores, repellendus ipsam animi non commodi natus ad quo eum
        iste quam cumque odio eligendi? Laboriosam sint eum inventore dolor
        numquam iusto, ad atque rem?
      </div>
    </div>
  );
}

export default SettingsPage;
