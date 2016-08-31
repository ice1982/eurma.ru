<?php
  $option='';// norand - отключить случайный выбор ссылок для внутренних. По-умолчанию случайный выбор
  $get_param=array();// перечисляем имена параметров, которые надо учитывать в url. Короче, все остальные вырезаются, кроме перечисленных 
  // по умолчанию страница учитывается без GET-параметров.
  // Режется также параметр - пустая строка (но не нуль)
  
  $page = preg_replace("/index\.(html|php|asp|pl|shtml|htm|shtm)/","",$_SERVER['REQUEST_URI']);
  $page = preg_replace("/main\.(html|php|asp|pl|shtml|htm|shtm)/","",$page);
  $page = preg_replace("/glavnaya\.(html|php|asp|pl|shtml|htm|shtm)/","",$page);
  
  $page=preg_replace('/^([^?]+)(\?.*?)?(#.*)?$/', '$1$3',$page);
  if(count($get_param)){
	$n=0;
	foreach($_GET as $param=>$value){
		if(in_array($param,$get_param)&&$value!==''){
			if(!$n){$page.='?';}
			if($n){$page.='&';}
			$page.=$param.'='.$value;
			$n++;
		}
	}
  }
  
  
  //path`s 
  $data_path = $modx->config['rb_base_dir'] . "snippets/logooutput/default/lang/data.php";
  $links_path = $modx->config['rb_base_dir'] . "snippets/logooutput/default/lang/links.php";
  $img_logo_path = "tpl/img/vidok.jpg";

 
  $data_handler = fopen($data_path,"r+");
  $data = array();//массив с содержимым файла
 
  //закинем в двумерный массив содержимое файла
  while(!feof($data_handler)){
   $line = explode(" * ", fgets($data_handler));//разделяем по разделителю
   $data[trim($line[0])] = trim($line[1]);//и укладываем в массив
  }
  $data = array_filter($data);
 
  
  //если текущий page уже имеет ссылку, то выводим ее
  if(array_key_exists($page, $data)){
    
    $html = $data[$page];
    
     
  //если нет, то берем из файла с сылкам и создаем новую привязку
  }else{
  
    //проверяем файл с сылками
    if(is_file($links_path)){
  
      $links = file($links_path);
  
    }else{
      //грузим с сервера и...
      //$links = file($links_path);
    }
  
    $main_end_pos = array_search("\n", $links);//ссылки для главных страниц обособлены в начале
                                         // и отделены пустой строкой
  
    //если главная страница
    if($page == '/'){
      //получаем массив ссылок для главной
      $links_for_main = array_slice($links, 0, $main_end_pos);
      $new_link = $links_for_main[ rand( 0, $main_end_pos-1 ) ];//берем любую ccылку
      
      $data[$page] = $new_link;
      $html = $new_link;
     
    }else{
      //получаем массив ссылок не для главных страниц
      //$page = preg_repalce("/\//","",$page);
      $links_for_other = array_slice( $links, $main_end_pos + 1 );
      
      //последняя присвоенная ссылка
     $next_link_pos = 0;
     if(count($data)){
        $last_val = end($data);
        if(key($data) == "/"){
          $last_val = prev($data);
       }
               
        if($last_val){
          $last_key = array_keys($links_for_other, $last_val."\n", true);
          $next_link_pos = $last_key[0] + 1;
          
        }else{
          $next_link_pos = 0;
        }
        
      }
      if($option=='norand'){
			$html = $links_for_other[$next_link_pos];
		}else{
			$html = $links_for_other[rand(0,(count($links_for_other)-1))];
	  }
      $data[$page] = $html;
      //echo "next_link_pos: ".$next_link_pos." ";
    }
    
    //и пишем в файл соответствий
    file_put_contents($data_path,"");//очищаем файл
    fseek($data_handler, 0 ,SEEK_SET);
    foreach($data as $key=>$value){
        fwrite($data_handler, $key." * ".$value."\r\n");
    }
    fclose($data_handler);
    //echo "<br/>Записано";
    
 }
 //print_r($data);
 echo "<img src='".$img_logo_path."'><span>".$html."</span>";

?>