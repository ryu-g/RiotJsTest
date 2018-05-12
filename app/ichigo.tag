<ichigo >
	<div class= "item" each= {item_list}>
		<img src="https://placehold.jp/150x150.png" alt="">
		<h3>{ name }</h1>
		<p>{ txt }</p>
	</div>
	<script> 
		var array = [{name: 'name' , txt: 'これはichigoタグの中身'}];
    for (var i = 0; i < 9; i++)
		array.push({name: 'name' , txt: 'これはichigoタグの中身'});

    this.item_list = array;
    this.image = opts.res
	</script>
</ichigo>