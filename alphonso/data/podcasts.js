

const Podcasts = [
    {
  id: "f3c65bf1-ef71-4cdd-9f63-0618dfd69789",
  name: "Night Talk",
  description: "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
  creator: "Julio Boord",
  poster: "https://images.pexels.com/photos/1918290/pexels-photo-1918290.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  episodes: 131
}, {
  id: "c5ca8348-9e9a-4041-8f99-3631f2b8492d",
  name: "The World Today",
  description: "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
  creator: "Farr Ritchley",
  poster: "https://images.pexels.com/photos/1051747/pexels-photo-1051747.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  episodes: 174
}, {
  id: "303107b1-38b7-472f-ac98-33b2e4a6cd6b",
  name: "Daily Story",
  description: "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
  creator: "Nichole Ghest",
  poster: "https://images.pexels.com/photos/163811/street-art-shipping-container-freight-highway-163811.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  episodes: 149
}, {
  id: "b5ef8e66-e04c-4794-945a-2c3ecc1b8216",
  name: "Spoken Words",
  description: "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.Phasellus in felis. Donec semper sapien a libero. Nam dui.",
  creator: "Jourdan Deeks",
  poster: "https://images.pexels.com/photos/2733337/pexels-photo-2733337.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  episodes: 140
}, {
  id: "cb715ec7-4788-45d8-9fed-2007b3bdc560",
  name: "The Lazy Genius",
  description: "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
  creator: "Verne Lamming",
  poster: "https://images.pexels.com/photos/3627937/pexels-photo-3627937.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  episodes: 103
}, {
  id: "003f6471-02e4-427c-bc0d-79c709dfcd01",
  name: "Where Should We Begin?",
  description: "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
  creator: "Gabby Conre",
  poster: "https://images.pexels.com/photos/3977529/pexels-photo-3977529.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  episodes: 158
}, {
  id: "95923cdc-f7ca-4c74-b362-f51137115dea",
  name: "How Did This Get Made?",
  description: "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
  creator: "Wright Dood",
  poster: "https://images.unsplash.com/photo-1584448141569-69f342da535c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=680&q=80",
  episodes: 169
}, {
  id: "dce39562-4a56-46cb-8a7d-b9fbabd9487f",
  name: "The Daily",
  creator: "Lock Emerine",
  poster: "https://images.unsplash.com/photo-1597658917821-e3e00bd9eab0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80",
  episodes: 69
}, {
  id: "a30e3376-109f-48e8-9b2a-d137bc1785b4",
  name: "Spooked",
  description: "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
  creator: "Noellyn Keoghane",
  poster: "https://images.unsplash.com/photo-1604367233958-8d0bf1de3c1b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
  episodes: 64
}

]


export default Podcasts