import { isObject, readStr } from "@brizy/utils";
import { API } from "@utils/api";
import { NextRequest as Req, NextResponse as Res } from "next/server";

export const systemPages = async (req: Req, next = Res.next): Promise<Res> => {
  const base = req.url;
  const path = req.nextUrl.pathname;

  try {
    const api = API.getInstance();
    const builderConfig = await api.getConfig();
    const { systemPage } = builderConfig;

    // Internal Builder System Page
    if (systemPage) {
      //#region ComingSoon

      const comingSoonSlug = readStr(systemPage.comingSoon);

      if (comingSoonSlug) {
        if (path === comingSoonSlug) {
          return Res.next();
        }

        return Res.redirect(new URL(comingSoonSlug, base));
      }

      //#endregion

      //#region Maintenance

      const maintenanceSlug = readStr(systemPage.maintenance);

      if (maintenanceSlug) {
        if (path === maintenanceSlug) {
          return Res.next();
        }

        return Res.redirect(new URL(maintenanceSlug, base));
      }

      //#endregion

      //#region PageNotFound

      const pageNotFoundSlug = readStr(systemPage.pageNotFound);

      if (pageNotFoundSlug) {
        if (path === pageNotFoundSlug) {
          return Res.next();
        }

        return Res.redirect(new URL(pageNotFoundSlug, base));
      }

      //#endregion

      //#region ProtectedProject

      const protectedProject = systemPage.protectedProject;

      if (isObject(protectedProject) && readStr(protectedProject.slug)) {
        if (path === protectedProject.slug) {
          return Res.next();
        }

        return Res.redirect(new URL(protectedProject.slug, base));
      }

      //#endregion

      //#region ResetPassword

      const resetPasswordPageSlug = readStr(systemPage.resetPasswordPage);

      if (resetPasswordPageSlug) {
        if (path === resetPasswordPageSlug) {
          return Res.next();
        }

        return Res.redirect(new URL(resetPasswordPageSlug, base));
      }

      //#endregion
    }
  } catch (e) {
    console.error(e);
    return next();
  }

  return next();
};
