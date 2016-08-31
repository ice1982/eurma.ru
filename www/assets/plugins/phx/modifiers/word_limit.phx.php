<?php
$retval = $output; $output = strip_tags(htmlspecialchars_decode($output));
          $array = explode(" ", $output);
          if (count($array)<=$options)
              {
              $retval = $output;
              }
          else
              {
              array_splice($array,$options);
              $retval = implode(" ", $array);
              }
          return $retval;
?>