export default function PodcastPage() {
  return (
  <main className="container views">
    <div className="ContaineurCard">
      {
        //{{range .Podcasts}}
      }
      <div className="Card">
        <a href="/podcast/details?id={{.Id}}">
        {
          //{{template "LogoPodcast"}}
        }
          <div className="podcast">
            <h2>TITRE</h2>
            {
              //{{.Title}}
            }
            <p><strong>Invités :</strong></p>
            {
              //{{.NameIntervenant}}
            }
            <p><strong>Sortie :</strong></p>
            {
              //{{.FormattedDate}}
            }
            <div className="linkAdmin">
              {
                //{{if $.IsAdmin}}
              }
              <a href="/podcast/edit?id={{.Id}}">
                <button type="submit">Éditer</button>
              </a>
              <form action="/podcast/delete?id={{.Id}}" method="post">
                <button type="submit">Supprimer</button>
              </form>
              {
                // {{end}}
              }
            </div>
          </div>
        </a>
      </div>
      {
        //{{end}}
      }
    </div>
    {
      //{{if $.IsAdmin}}
    }
    <div className="buttonAdmin">
      <a href="/podcast/create" className="buttonAdminLink">Creation</a>
    </div>
    {
      //{{end}}
    }

    {
      /*
      <div className="backgroundSVG">
        {{template "Background"}}
        {{template "Background"}}
      </div>
      */
    }
  </main>
  )
}
