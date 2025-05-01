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
    return '<div class="container">
'.LR::sec($cx, (($inary && isset($in['content'])) ? $in['content'] : null), null, $in, false, function($cx, $in) {$inary=is_array($in);return '  <div class="container-fluid ns" data-reveal="display">
    <div class="w40">
      <img src="'.(($inary && isset($in['img_src'])) ? $in['img_src'] : null).'" alt="'.(($inary && isset($in['img_alt'])) ? $in['img_alt'] : null).'" />
    </div>
    <div class="w60">
      <h3>'.(($inary && isset($in['titre_1'])) ? $in['titre_1'] : null).'</h3>
      <h4>'.(($inary && isset($in['titre_2'])) ? $in['titre_2'] : null).'</h4>
      <p>'.(($inary && isset($in['article'])) ? $in['article'] : null).'</p>
      <p>'.(($inary && isset($in['rmtext'])) ? $in['rmtext'] : null).'</p>
'.LR::sec($cx, (($inary && isset($in['readmore'])) ? $in['readmore'] : null), null, $in, false, function($cx, $in) {$inary=is_array($in);return '      <p>
        <a class="readmore" href="'.(($inary && isset($in['link'])) ? $in['link'] : null).'">
          <img
            src="/images/icons/read_more_24dp.svg"
            alt="Read more"
          />
          '.(($inary && isset($in['text'])) ? $in['text'] : null).'
        </a>
      </p>
';}).'    </div>
  </div>
';}).'</div>
';
}; ?>