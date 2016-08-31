
$sContent = "<!-- documentId:".$modx->documentObject['id']." -->";

global $modx;
if($pos = strpos($modx->documentOutput,'</body>')){
	$modx->documentOutput = substr($modx->documentOutput,0,$pos).$sContent.substr($modx->documentOutput,$pos);
}
