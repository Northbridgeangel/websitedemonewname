Ignorar meshes cuyo nombre empiecen por "Escena" y a tener en cuenta:

Meshes interactivos / Data Raycastable (no clickables)
<a-entity id="PuertaDorm" gltf-model="#PuertaDorm" data-raycastable></a-entity>
<a-entity id="PuertaGallery" data-raycastable></a-entity>
<a-entity id="PuertaSecreta" data-raycastable><!-- Entidad padre para Puerta Secreta -->
<a-entity gltf-model="#PuertaSecreta_Base"></a-entity><!-- Mesh Base (JPG) -->
<a-entity gltf-model="#PuertaSecreta_Espejo"></a-entity><!-- Mesh Espejo (material espejo) -->
</a-entity>
<a-entity id="Carteldormnote" data-raycastable></a-entity>
<a-entity id="Cartelstudynotes" data-raycastable></a-entity>
<a-entity id="Mybackground" data-raycastable></a-entity>
<a-entity id="Transparent_floor" data-raycastable></a-entity>

Meshes interactivos / Data Raycastable (clickables)
<a-entity id="Bienvenido-cuadro_de_texto" data-raycastable clickable></a-entity>
<a-entity id="Objetoañadido" data-raycastable clickable></a-entity>
<a-entity id="Selfnotemesh" data-raycastable clickable></a-entity>

Botones como entities separadas
<a-entity id="Btn-creator-menú" data-raycastable clickable></a-entity>
<a-entity id="Btn-change-mode" data-raycastable clickable></a-entity>
<a-entity id="Btn-pta-dorm" data-raycastable clickable></a-entity>
<a-entity id="Btn-pta-gly" data-raycastable clickable></a-entity>
<a-entity id="Btn-pta-scta" data-raycastable clickable></a-entity>
<a-entity id="Btn-upload-img" data-raycastable clickable></a-entity>
