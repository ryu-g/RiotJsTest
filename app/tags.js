import riot from 'riot'
riot.tag2('app', '<title>riotTest</title> <h1>Hello, parcel world!</h1> <h3>{nameA}</h3> <p>{ageA}</p> <h3>{nameB}</h3> <p>{ageB}</p>', '', '', function(opts) {
  	this.nameA = "{nameA}に入るテキスト";
	this.ageA = "{ageA}に入るテキスト";
  	this.nameB = opts.name;
	this.ageB = opts.age;
});
