html
  head
    title Hello Riot.
  body
    //- !-- place the custom tag anywhere inside the body --
    sample
    //- !-- include the tag --
    script(type="riot/tag" src="sample.tag")
    //- !-- include riot.js --
    script(src="https://cdn.jsdelivr.net/npm/riot@3.9/riot+compiler.min.js")
    //- !-- mount the tag --
    script riot.mount('sample')