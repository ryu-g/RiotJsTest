import riot from 'riot'
riot.tag2('app', '<img src="https://placehold.jp/150x150.png" alt=""> <h3>{head}</h3> <p>{txt}</p>', '', 'class="item"', function(opts) {
  	this.head = opts.head;
	this.txt = opts.txt;
});

riot.tag2('coffee', '<h1>{name}</h1>', '', '', function(opts) {
		this.name= opts.name
});
riot.tag2('ichigo', '<div class="item" each="{item_list}"> <img src="https://placehold.jp/150x150.png" alt=""> <h3>{name}</h1> <p>{txt}</p> </div>', '', '', function(opts) {

		var array = [{name: 'name' , txt: 'これはichigoタグの中身'}];
    for (var i = 0; i < 9; i++)
		array.push({name: 'name' , txt: 'これはichigoタグの中身'});

    this.item_list = array;
    this.image = opts.res
});