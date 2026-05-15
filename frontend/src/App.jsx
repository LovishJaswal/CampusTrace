import axios from "axios"
import { useEffect, useState } from "react"

function App() {

  const [isLogin, setIsLogin] = useState(false)
  const [user, setUser] = useState(null)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [items, setItems] = useState([])

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const fetchItems = async () => {

    const response = await axios.get("http://localhost:5000/api/items")

    setItems(response.data)
  }

  useEffect(() => {

    fetchItems()

  }, [])

  const handleSubmit = async () => {

    try {

      if (isLogin) {

        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email,
            password
          }
        )

        setUser(response.data.user)
      }

      else {

        await axios.post(
          "http://localhost:5000/api/auth/signup",
          {
            name,
            email,
            password
          }
        )

        alert("Signup Successful")

        setIsLogin(true)
      }

    }

    catch (error) {

      alert(error.response.data.message)
    }
  }

  const addItem = async () => {

    await axios.post("http://localhost:5000/api/items", {

      title,
      description,
      category: "Electronics",
      location: "Campus",
      contact: user.email,
      type: "lost",
      createdBy: user._id

    })

    fetchItems()

    setTitle("")
    setDescription("")
  }

  const deleteItem = async (id) => {

    await axios.delete(`http://localhost:5000/api/items/${id}`)

    fetchItems()
  }

  const resolveItem = async (id) => {

    await axios.put(`http://localhost:5000/api/items/resolve/${id}`)

    fetchItems()
  }

  if (!user) {

    return (

      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-indigo-950 flex items-center justify-center px-4 text-white">

        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

          <div className="mb-8 text-center">

            <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              CampusTrace
            </h1>

            <p className="text-zinc-400 mt-3">
              Lost & Found Portal For Students
            </p>

          </div>

          {
            !isLogin && (

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-900/80 border border-zinc-700 p-4 rounded-2xl mb-4 outline-none focus:border-cyan-500 transition"
              />
            )
          }

          <input
            type="email"
            placeholder="College Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-900/80 border border-zinc-700 p-4 rounded-2xl mb-4 outline-none focus:border-cyan-500 transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-900/80 border border-zinc-700 p-4 rounded-2xl mb-5 outline-none focus:border-cyan-500 transition"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] transition p-4 rounded-2xl font-bold text-lg"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>

          <p
            className="text-center mt-6 text-zinc-400 cursor-pointer hover:text-white transition"
            onClick={() => setIsLogin(!isLogin)}
          >
            {
              isLogin
                ? "New here? Create account"
                : "Already have an account? Login"
            }
          </p>

        </div>

      </div>
    )
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-zinc-900 text-white px-4 py-8">

      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

          <div>

            <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              CampusTrace
            </h1>

            <p className="text-zinc-400 mt-2">
              Welcome back, {user.name}
            </p>

          </div>

          <button
            onClick={() => setUser(null)}
            className="bg-red-500 hover:bg-red-600 transition px-5 py-3 rounded-2xl font-semibold"
          >
            Logout
          </button>

        </div>

        <div className="grid lg:grid-cols-[400px_1fr] gap-8">

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 h-fit shadow-2xl">

            <h2 className="text-2xl font-bold mb-5">
              Report Lost Item
            </h2>

            <input
              type="text"
              placeholder="Item title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-900/80 border border-zinc-700 p-4 rounded-2xl mb-4 outline-none focus:border-cyan-500 transition"
            />

            <textarea
              placeholder="Describe the item"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-zinc-900/80 border border-zinc-700 p-4 rounded-2xl mb-5 outline-none focus:border-cyan-500 transition min-h-[130px] resize-none"
            />

            <button
              onClick={addItem}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] transition p-4 rounded-2xl font-bold text-lg"
            >
              Add Item
            </button>

          </div>

          <div>

            <h2 className="text-3xl font-bold mb-6">
              Recent Reports
            </h2>

            <div className="space-y-5">

              {
                items.map((item) => (

                  <div
                    key={item._id}
                    className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:border-cyan-500/40 transition"
                  >

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                      <div>

                        <h3 className="text-2xl font-bold text-cyan-300">
                          {item.title}
                        </h3>

                        <p className="text-zinc-400 mt-3 leading-relaxed">
                          {item.description}
                        </p>

                        <p className="text-sm text-zinc-500 mt-4">
                          Posted by: {item.contact}
                        </p>

                      </div>

                      <div>

                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          item.status === "resolved"
                            ? "bg-green-500"
                            : "bg-yellow-500 text-black"
                        }`}>
                          {item.status}
                        </span>

                      </div>

                    </div>

                    {
                      user._id === item.createdBy && (

                        <div className="flex flex-wrap gap-4 mt-6">

                          <button
                            onClick={() => resolveItem(item._id)}
                            className="bg-green-500 hover:bg-green-600 transition px-5 py-3 rounded-2xl font-semibold"
                          >
                            Mark Resolved
                          </button>

                          <button
                            onClick={() => deleteItem(item._id)}
                            className="bg-red-500 hover:bg-red-600 transition px-5 py-3 rounded-2xl font-semibold"
                          >
                            Delete
                          </button>

                        </div>
                      )
                    }

                  </div>
                ))
              }

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default App