(function (global){

var ListCtrl;
UAM.ListCtrl = function(listView, store){
    
    // event klikniecie przycisku
	listView.on('ev_click', function(id){
		store.updates(id);
	})
    
    // event na zmianę aktywnosci
	store.on("ev_changed", function(task_text, status, active, id){
		listView.updates(task_text, status, id);
	})
    
    // event podczas dodawania taska
	store.on('ev_newtask',function(task_text, status, len, id){ 
		listView.newTaskkToList(task_text, status, id);
	})
}

}(window));