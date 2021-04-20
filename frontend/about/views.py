from rest_framework.views import APIView
from classification_of_manuscripts.settings_local import SERVER_VERSION
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny


class About(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]
    template_name = 'about.html'

    def get(self, request):
        context = {
            'server_version': SERVER_VERSION,
            # 'username': request.user
        }
        print()
        return Response(context)
