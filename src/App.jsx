import "./styles/App.css";

function App() {
  return (
    <main>
      <h1>
        university
        <span>hub</span>
      </h1>
      <form>
        <input
          type="text"
          id="input"
          onInput={(e) => {
            const creator = document.querySelector('.creator')
            let para = e.target.value;
            if (para.search(/[a-zA-Z]{3,15}$/) || para == null || para == "") {
              e.target.classList.add("error");
              creator.style.height = "0";
              creator.style.padding = "0";
            } else {
              e.target.classList.remove("error");
              creator.replaceChildren();
              creator.style.height = "300px";
              creator.style.padding = "40px";
              fetch(
                "http://universities.hipolabs.com/search?country=United+States"
              )
                .then((res) => res.json())
                .then((data) => {
                  data.map((val) => {
                    let _sam = val.name.search(para);
                    if (_sam == 0) {
                      e.target.value = "";
                      creator.innerHTML += `
                        <li>
                          <h2>${val.name}</h2>
                          <p>${val.country}</p>
                          <a href=${val.web_pages[0]} target="_blank" rel="noreferrer">${val.domains}</a>
                        </li>
                      `;
                    } else {
                      creator.style.height = "300px";
                      creator.style.padding = "40px";
                    }
                  });
                });
            }
          }}
        />
        <span id="btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </span>
      </form>
      <ul
        className="creator"
        style={{ transition: "1s", height: "0px", padding: "0" }}
      ></ul>
    </main>
  );
}

export default App;
