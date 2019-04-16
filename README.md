# Svelte Router

Simple client side hash router for [Svelte 3](https://v3.svelte.technology)

```html
<script>
  import Router from './Router.svelte'

  import Home from './components/Home.svelte'
  ...

  const routes =[
    {
      path: "/home",
      component: Home
    },
    {
      // Code split and load asynchronously,
      path: "/about",
      component:() => import("./components/About.svelte")
    },
    {
      // Match any non-empty path
      path: "/*",
      component: OtherComponent,

    },
    {
      // Fallback component
      // Match any path
      component: NotFound,
      // Pass props
      props: {
        from: "Home Page"
      }
    }
  ]
</script>

<Router routes="{routes}">
  <!-- loading placeholder -->
  <p>
    <img src="awesome/loader.gif" alt="loading" />
  </p>
  <!-- Error placeholder -->
  <!-- Error as slot prop -->
  <p slot="error" let:error="{error}">
    <img src="sad/minion.png" alt="" />
    {#if error.code===404}
    <span>This page does not exist</span>
    {/if}
    <a href="hashed/path/to/home">Home</a>
  </p>
</Router>
```

- Both slots receive current path as prop `route`

## TODO

- `Link` component
- `redirect`
- Nested routing
