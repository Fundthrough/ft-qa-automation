// describe("Validate DB Connection", () => {
//   beforeEach(() => {
//     cy.fixture("profile.json")
//       .then(function (user) {
//         this.user = user;
//       })
//       .as("user");
//   });

//   it("Validate the table count", () => {
//     cy.task("orbit", { query: "select COUNT(*) from invoices" }).then(
//       (resp) => {
//         expect(resp[0]).to.have.property("count").and.equals("158921");
//       }
//     );
//   });

//   it("Validate the single row response", () => {
//     cy.task("orbit", {
//       query: "select * from invoices where id='158918'",
//     }).then((resp) => {
//       expect(resp[0]).to.have.property("auto_fund").and.equals(false);
//       expect(resp[0])
//         .to.have.property("payor_name")
//         .and.equals("Extendicare canada");
//     });
//   });

//   it("Validate user record after signup spec", function test() {
//     let username = `'${this.user.username}'`;
//     cy.task("orbit", {
//       query: "select * from users where email=" + username,
//     }).then((resp) => {
//       console.log(resp.length);
//       if (resp.length === 0) {
//         cy.log("No record found");
//       } else {
//         expect(resp[0])
//           .to.have.property("email")
//           .and.equals(username.replace(/["']/g, ""));
//       }
//     });
//   });
// });
