<?php use \LightnCandy\Runtime as LR;return function ($in = null, $options = null) {
    $helpers = array();
    $partials = array();
    $cx = array(
        'flags' => array(
            'jstrue' => false,
            'jsobj' => false,
            'jslen' => false,
            'spvar' => false,
            'prop' => false,
            'method' => false,
            'lambda' => false,
            'mustlok' => false,
            'mustlam' => false,
            'mustsec' => false,
            'echo' => false,
            'partnc' => false,
            'knohlp' => false,
            'debug' => isset($options['debug']) ? $options['debug'] : 1,
        ),
        'constants' => array(),
        'helpers' => isset($options['helpers']) ? array_merge($helpers, $options['helpers']) : $helpers,
        'partials' => isset($options['partials']) ? array_merge($partials, $options['partials']) : $partials,
        'scopes' => array(),
        'sp_vars' => isset($options['data']) ? array_merge(array('root' => $in), $options['data']) : array('root' => $in),
        'blparam' => array(),
        'partialid' => 0,
        'runtime' => '\LightnCandy\Runtime',
    );
    
    $inary=is_array($in);
    return '<div class="mymenu secondth">
  <ul>
'.LR::sec($cx, (($inary && isset($in['nav'])) ? $in['nav'] : null), null, $in, false, function($cx, $in) {$inary=is_array($in);return ''.((LR::isec($cx, (($inary && isset($in['down'])) ? $in['down'] : null))) ? '      <li '.LR::sec($cx, (($inary && isset($in['active'])) ? $in['active'] : null), null, $in, false, function($cx, $in) {$inary=is_array($in);return 'class="active"';}).'><a href="'.(($inary && isset($in['uri'])) ? $in['uri'] : null).'">'.(($inary && isset($in['name'])) ? $in['name'] : null).'</a></li>
' : '').'';}).'  <ul>
</div>
<div class="mymenu thirth">
  <ul>
'.LR::sec($cx, (($inary && isset($in['nav'])) ? $in['nav'] : null), null, $in, false, function($cx, $in) {$inary=is_array($in);return ''.LR::sec($cx, (($inary && isset($in['dropdown'])) ? $in['dropdown'] : null), null, $in, false, function($cx, $in) {$inary=is_array($in);return '      <li>
        <a href="'.(($inary && isset($in['uri'])) ? $in['uri'] : null).'"><img src="'.(($inary && isset($in['image'])) ? $in['image'] : null).'" alt="'.(($inary && isset($in['name'])) ? $in['name'] : null).'" /></a>
      </li>
';}).'';}).'    </ul>
</div>';
}; ?>