const React = require("react")
const DefaultLayout = require("../layout/Default")

class Index extends React.Component {
  render() {
    const  { fruits } = this.props
    return (
      <DefaultLayout title="Fruits Index Page">
        {/* <h1>Fruits Index Page</h1> */}
        <nav>
          <a href="/fruits/new">Create Fruit</a>
        </nav>
        <ul>
          {
            fruits.map((fruit, i) => {
              return (
                <li> 
                  The{' '}
                  <a style={{color: "red"}} href={`/fruits/${fruit._id}`}>{fruit.name}</a>
                  {" "}
                  is {fruit.color} <br />
                  {
                    fruit.readyToEat 
                    ? "It is ready to eat" 
                    : "It is not ready to eat"
                  }
                  <br />
                  <a href={`/fruits/${fruit._id}/edit`}>Edit This Fruit</a>
                  <form action={`/fruits/${fruit._id}?_method=DELETE`} method="POST">
                    <input type="submit" value="DELETE" />
                  </form>
                </li>
              )
            })
          }
        </ul>
      </DefaultLayout>
    )
  } 
}

module.exports = Index