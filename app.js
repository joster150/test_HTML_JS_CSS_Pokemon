function uppername(name){
  return name.charAt(0).toUpperCase() + name.slice(1);
}
$(document).ready(function(){
  $.get("https://pokeapi.co/api/v2/pokemon/",function(data,status)
  {
    //console.log(data);
    var poke_id=[];
    for(index in data.results){
      var name=data.results[index].name;
      name=uppername(name);
      poke_id[index]="Poke_"+index.toString();
      var to_append="<li class='tooltip' id='"+poke_id[index]+"'>"+name+"<span class='tooltiptext'>Click Me<\span>"+"</li>";
      if (index>=10)
        $("#PokeList2").append(to_append);
      else
        $("#PokeList").append(to_append);
    }
  $("#PokeList,#PokeList2").children().click(function(){
    if(this.style.fontWeight!="bold")
      $(this).css("font-weight","bold");
    var poke_num;
    for(x in poke_id){
      if (this.id!=poke_id[x])
        $("#"+poke_id[x]).css("font-weight","normal");
      else {
        poke_num=parseInt(x)+1;
      }
    }
    url_to_go="https://pokeapi.co/api/v2/pokemon/"+poke_num+"/";
    $.get(url_to_go,function(data2,status2){
      var abil_list="",stat_list="";
      for (abil_id in data2.abilities){
          abil_list+=("<li>"+uppername(data2.abilities[abil_id].ability.name)+"</li>");
      }
      for (stat_id in data2.stats){
          stat_list+=("<li>"+uppername(data2.stats[stat_id].stat.name)+" : "+data2.stats[stat_id].base_stat+"</li>");
      }
      $("#Pokestats").html(stat_list);
      $("#Pokeabil").html(abil_list);
    });
  });
  $("#PokeList,#PokeList2").children().trigger("click");
  });

});
