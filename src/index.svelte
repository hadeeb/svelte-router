<script>
  const NO_MATCH = {
    code: 404,
    message: "No Matching Route"
  };

  export let routes;

  let promise;

  let selected = null;

  let path = location.hash.slice(1);

  $: {
    if (path[0] !== "/") {
      location.hash = "/" + path;
    }
  }

  function selectComponent() {
    const currentUrl = path.slice(1);

    const matchedRoute = routes.find(route => {
      const toMatchPath = (route.path || "").slice(1);
      return (
        !toMatchPath || // fallback route
        (toMatchPath === "*" && currentUrl) || // Match non-empty route
        currentUrl.startsWith(toMatchPath)
      );
    });

    if (matchedRoute) {
      if (!selected || selected.component !== matchedRoute.component) {
        selected = {
          component: matchedRoute.component,
          props: matchedRoute.props || {}
        };
        try {
          promise = matchedRoute.component().then(x => x.default);
        } catch (_) {
          promise = Promise.resolve(matchedRoute.component);
        }
      }
    } else {
      promise = Promise.reject(NO_MATCH);
      selected = null;
    }
  }

  selectComponent();

  function onHashChange() {
    path = location.hash.slice(1);
    selectComponent();
  }
</script>

<svelte:window on:hashchange="{onHashChange}"></svelte:window>

{#await promise}
<slot route="{path}">
  <p>...waiting</p>
</slot>
{:then component}
<svelte:component this="{component}" {...selected.props} />
{:catch error}
<slot name="error" route="{path}" error="{error}">
  <p style="color: red">{error.message}</p>
</slot>
{/await}
