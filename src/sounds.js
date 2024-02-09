var leoSounds = [
    'arabic_f.mp3',
    'arabic_m.mp3',
    'chin_m.mp3',
    'chin_m2.mp3',
    'danisch_f.mp3',
    'danisch_m.mp3',
    'dutch_f.mp3',
    'dutch_m.mp3',
    'elgisch_m2.mp3',
    'englisch_4.mp3',
    'englisch_5.mp3',
    'english.mp3',
    'enlgisch_3.mp3',
    'frensh_f.mp3',
    'frensh_m.mp3',
    'german_f.mp3',
    'german_f2.mp3',
    'german_m.mp3',
    'hebraisch_m.mp3',
    'italian_f.mp3',
    'italian_m.mp3',
    'italian_m2.mp3',
    'japanese_child.mp3',
    'japanese_f.mp3',
    'japanese_m.mp3',
    'korean_f.mp3',
    'korean_m.mp3',
    'norway_f.mp3',
    'norway_m.mp3',
    'polisch_f.mp3',
    'polish_m.mp3',
    'portugal_f.mp3',
    'portugal_m.mp3',
    'porturgal_f2.mp3',
    'romain_f.mp3',
    'romain_f2.mp3',
    'rusiisch_f.mp3',
    'russisch_m.mp3',
    'schwedisch_f.mp3',
    'schwedisch_f2.mp3',
    'schwedisch_m.mp3',
    'spanisch_f.mp3',
    'spanisch_m.mp3',
    'spansich_m2.mp3',
    'tarkisch_f.mp3',
    'tarkisch_m.mp3',
    'welsch_f.mp3',
    'welsch_m.mp3'
  ]

  jQuery(document).ready(function($) {
    // LOAD LEO SOUNDS
    // leoSounds.map(sound => {
    //     var audioHTML = '<div class="audio-container">'
    //     audioHTML = audioHTML + `<audio class="audio-${sound.slice(0,-4)}" src="${LEOSITE.templateURI}/sounds/${sound}"></audio>`
    //     audioHTML + audioHTML + '</div>'
    //     $(document.body).append(audioHTML)

    // })
    // PLAY LEO SOUNDS
    $('.play-leo').click(function() {
        // console.log('play leo')
        var sound = leoSounds[Math.floor(Math.random()*leoSounds.length)];
        // console.log("playing: ", sound)
        $(`.audio-${sound.slice(0,-4)}`).get(0).play()
      })

    //   $('.play-leo-portfolio').click(function() {
    //     console.log('play leo')
    //     var sound = leoSounds[Math.floor(Math.random()*leoSounds.length)];
    //     console.log("playing: ", sound)
    //     $(`.audio-${sound.slice(0,-4)}`).get(0).play()
    //   })

    $(document).on('click', '.play-leo-portfolio', function(e) {
        // console.log('play that leo')
        var sound = leoSounds[Math.floor(Math.random()*leoSounds.length)];
        // console.log("playing: ", sound)
        $(`.audio-${sound.slice(0,-4)}`).get(0).play()
    })
  })